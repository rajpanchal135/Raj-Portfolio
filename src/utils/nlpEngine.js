// Stopwords to ignore (words that carry no mathematical weight)
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with', 'you', 'your', 'i', 'my', 'me', 'what', 'how', 'who', 'where', 'why', 'can', 'do', 'tell', 'about', 'show', 'give', 'some', 'any', 'have', 'want', 'offer', 'lets', 'let', 'us', 'please', 'just', 'like', 'would', 'could'
])

// The Training Corpus (Intents & Example Utterances)
const TRAINING_DATA = {
  greetings: [
    "hello", "hi", "hey", "good morning", "good evening", "howdy", "greetings", "wassup", "sup"
  ],
  skills: [
    "skills", "technologies", "tech stack", "programming languages", "python", "react", "fastapi", "know", "frameworks", "tools", "backend", "frontend", "expert", "experience", "software", "engineer", "web", "developer", "coder", "coding", "design", "css", "html", "javascript", "js", "node"
  ],
  projects: [
    "projects", "built", "portfolio", "github", "spherevision", "desktop assistant", "work", "case studies", "made", "created", "build", "website", "app", "application", "resume", "cv", "code", "repo", "repository"
  ],
  education: [
    "study", "university", "college", "degree", "msc", "bca", "graduation", "cgpa", "qualifications", "school", "background", "student", "learn", "learning"
  ],
  contact: [
    "contact", "email", "hire", "reach", "linkedin", "phone number", "message", "work together", "job", "freelance", "connect", "offer", "interview", "call", "talk"
  ],
  whoami: [
    "who are you", "name", "yourself", "who is raj", "raj pithava", "about you", "bio", "introduction", "intro"
  ]
}

// 1. Tokenize & Clean text
const tokenize = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove punctuation
    .split(/\s+/) // Split by whitespace
    .filter(word => word.length > 0 && !STOPWORDS.has(word)) // Remove stopwords
}

// 2. Precompute the Vocabulary and Document Frequencies
const vocabulary = new Set()
const docFrequencies = {}
const docs = []

// Initialize the model
const initializeModel = () => {
  for (const [intent, utterances] of Object.entries(TRAINING_DATA)) {
    for (const utterance of utterances) {
      const tokens = tokenize(utterance)
      docs.push({ intent, tokens })
      
      const uniqueTokens = new Set(tokens)
      uniqueTokens.forEach(token => {
        vocabulary.add(token)
        docFrequencies[token] = (docFrequencies[token] || 0) + 1
      })
    }
  }
}

initializeModel()

// 3. Calculate TF-IDF Vector for a given array of tokens
const calculateTFIDF = (tokens) => {
  const vector = {}
  
  // Term Frequency (TF)
  const termCounts = {}
  tokens.forEach(token => {
    termCounts[token] = (termCounts[token] || 0) + 1
  })
  
  const totalTokens = tokens.length || 1 // Avoid division by zero
  
  // Calculate TF * IDF for each word in vocabulary
  vocabulary.forEach(word => {
    const tf = (termCounts[word] || 0) / totalTokens
    const idf = Math.log(docs.length / ((docFrequencies[word] || 0) + 1)) // +1 smoothing
    vector[word] = tf * idf
  })
  
  return vector
}

// Precalculate vectors for training data
const trainingVectors = docs.map(doc => ({
  intent: doc.intent,
  vector: calculateTFIDF(doc.tokens)
}))

// 4. Cosine Similarity between two vectors
const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (const word of vocabulary) {
    const valA = vecA[word] || 0
    const valB = vecB[word] || 0
    dotProduct += valA * valB
    normA += valA * valA
    normB += valB * valB
  }
  
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

// 5. Predict Intent
export const predictIntent = (userInput) => {
  const tokens = tokenize(userInput)
  
  // If no valid tokens after stopword removal, it's out of scope
  if (tokens.length === 0) return 'unknown'

  const userVector = calculateTFIDF(tokens)
  
  let bestIntent = 'unknown'
  let highestScore = -1
  
  // Compare against all training documents
  for (const { intent, vector } of trainingVectors) {
    const score = cosineSimilarity(userVector, vector)
    if (score > highestScore) {
      highestScore = score
      bestIntent = intent
    }
  }
  
  // Thresholding: If the highest score is very low, it means the input is completely unrelated
  if (highestScore < 0.05) {
    return 'unknown'
  }
  
  return bestIntent
}
