import TopicLayout from "@/components/TopicLayout";

export default function RAGBasicsPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 3 of 10"
      title="RAG Basics"
      currentHref="/learn/rag-basics"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Retrieval-Augmented Generation?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Retrieval-Augmented Generation (RAG) is a system architecture that combines information retrieval with text generation to produce accurate, up-to-date, and source-grounded responses. Instead of relying solely on an LLM's static training data, RAG systems dynamically fetch relevant documents from external knowledge bases—such as company wikis, technical documentation, legal databases, or research paper repositories—and inject those documents into the generation context. This approach mitigates two major LLM limitations: knowledge cutoff (the model doesn't know events after its training date) and hallucination (the model confidently states incorrect information when it lacks knowledge).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The RAG pipeline has three distinct stages: indexing, retrieval, and generation. During indexing, source documents are chunked into manageable segments (typically 500-1500 tokens), converted into vector embeddings using models like OpenAI's text-embedding-3-small or open-source alternatives like BGE or E5, and stored in a vector database such as Pinecone, Weaviate, or PostgreSQL with pgvector. The retrieval stage takes a user query, converts it to an embedding, and performs a similarity search to find the most relevant document chunks. The generation stage injects the retrieved chunks into a prompt template alongside the user query and instructs the LLM to answer using only the provided sources.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Spec engineering for RAG systems requires defining parameters at each stage. For indexing, you specify chunk size, overlap strategy (e.g., 10% overlap between chunks to preserve context across boundaries), metadata fields to preserve (document title, section, last updated date), and embedding model selection. For retrieval, you define the number of chunks to retrieve (top-k), similarity threshold (minimum cosine similarity score to include a chunk), and reranking logic (using a cross-encoder to reorder results by relevance). For generation, you define the prompt template, source citation requirements, and fallback behavior when no relevant documents are found.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A well-spec'd RAG system outperforms fine-tuning for many use cases because it keeps knowledge external and updatable. When company policies change, you update the document store—no model retraining required. Spec engineers must define document freshness rules (e.g., "prioritize documents updated within the last 90 days"), conflict resolution (when two documents contradict each other), and scope boundaries (when to admit the system doesn't have enough information to answer rather than hallucinating).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">RAG Pipeline Components in Detail</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The indexing pipeline is where most RAG performance issues originate. Chunking strategy directly impacts retrieval quality: too large and the embedding loses specificity (a 4000-token chunk about "billing" might include unrelated sections); too small and you lose context (a 100-token chunk might not include the full procedure for a multi-step process). Spec engineering for chunking defines chunk size (commonly 512-1024 tokens), overlap percentage (5-15% to preserve context at boundaries), and semantic chunking rules (split at paragraph or section boundaries rather than arbitrary token counts when possible).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Embedding model selection affects retrieval accuracy across domains. General-purpose embeddings work well for broad topics, but specialized domains like legal, medical, or technical documentation benefit from domain-specific embedding models fine-tuned on relevant corpora. Specs should define the embedding model, dimensions (768 for BGE-large, 1536 for OpenAI embeddings), and normalization rules. Additionally, metadata filtering specs define which document attributes can be used to pre-filter results—for example, "only retrieve documents tagged with 'policy' for policy-related queries" improves precision.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The retrieval stage uses vector similarity search, but production RAG systems add hybrid search combining keyword (BM25) and semantic search for better recall. Specs for hybrid search define the weighting between keyword and semantic scores (e.g., 40% keyword, 60% semantic), minimum score thresholds, and deduplication logic. Without dedup, the same document retrieved from multiple search paths can dominate the context window. A good spec also defines max context window utilization (e.g., "retrieved chunks must not exceed 60% of the LLM's context window to leave room for the prompt template and query").
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The generation stage prompt is where retrieved context meets the user query. Spec engineering here defines how sources are formatted in the prompt (e.g., numbered citations, XML tags around each source), instructions for handling insufficient context ("if the sources do not contain the answer, respond 'I don't have enough information'"), and citation requirements ("every factual claim must reference a source number"). Poor generation specs lead to sources being ignored by the LLM or the model hallucinating despite having correct sources in context.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Technical Documentation RAG</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          This spec defines a RAG system for internal engineering documentation at a cloud infrastructure company:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">RAG SYSTEM:</div>
          <div className="mb-2">Engineering Docs Q&A v3.0</div>
          <div className="text-[var(--accent-text)]">INDEXING CONFIG:</div>
          <div className="mb-1">Chunk size: 800 tokens, overlap: 10%, split at markdown headings</div>
          <div className="mb-1">Embedding model: text-embedding-3-small (1536 dims), normalize: true</div>
          <div className="mb-1">Metadata preserved: doc_title, section, last_updated, tags[], owner</div>
          <div className="text-[var(--accent-text)]">RETRIEVAL CONFIG:</div>
          <div className="mb-1">Top-k: 5 chunks, min similarity: 0.72, hybrid search (50% keyword / 50% semantic)</div>
          <div className="mb-1">Metadata filter: only retrieve docs tagged with "production" for deployment queries</div>
          <div className="text-[var(--accent-text)]">GENERATION PROMPT:</div>
          <div className="mb-1">"Answer using ONLY the provided sources. Format: [Answer] followed by [Sources: #, #]. If sources insufficient, say 'I don't have enough information in the current docs.'"</div>
          <div className="text-[var(--accent-text)]">FALLBACK:</div>
          <div>If top similarity &lt; 0.6, expand search to include "archive" tagged docs before returning "insufficient info".</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor spec comparison:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD RAG SPEC:</div>
          <div className="mb-2">Search docs and answer questions. Use embeddings. Show sources.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No chunking strategy, no embedding model, no top-k, no similarity threshold, no prompt template, no fallback. Returns irrelevant results and ignores sources.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Minimal RAG Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          This implementation shows a complete RAG pipeline with chunking, embedding, retrieval, and generation:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`async function ragQuery(userQuery: string, vectorDb: VectorDB, llm: LLM) {
  // 1. Embed the query
  const queryEmbedding = await embedModel.embed(userQuery);

  // 2. Retrieve top-k relevant chunks
  const results = await vectorDb.similaritySearch(queryEmbedding, {
    topK: 5,
    minScore: 0.72,
    filters: { tags: { $contains: 'production' } }
  });

  if (results.length === 0) {
    return { answer: "I don't have enough information in the current docs.", sources: [] };
  }

  // 3. Build context from retrieved chunks
  const context = results.map((r, i) => \`[Source \${i+1}] \${r.content}\`).join('\\n\\n');

  // 4. Generate answer with sources
  const prompt = \`Answer using ONLY the provided sources.

Sources:
\${context}

Question: \${userQuery}

Format: [Answer] followed by [Sources: #, #]\`;
  const answer = await llm.generate(prompt, { temperature: 0.1 });

  return { answer, sources: results.map(r => ({ title: r.metadata.doc_title, id: r.id })) };
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This pipeline enforces the spec: minimum similarity threshold of 0.72 filters low-quality matches, metadata filtering restricts to production-tagged docs, and the prompt instructs the LLM to use only provided sources with a specific output format. The temperature is set to 0.1 to minimize hallucination. Spec deviations—like removing the similarity threshold—would cause irrelevant chunks to pollute the context and degrade answer quality.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Legal research RAG: Law firms use RAG to search case law, statutes, and contracts. Chunks are structured by legal citation, embedding models are fine-tuned on legal corpora, and generation prompts require citations to specific cases with full case names and dates. Specs define privilege rules: "never retrieve documents tagged 'attorney-client-privileged' unless the querying user has 'senior-partner' role".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Healthcare RAG: Hospital systems use RAG to answer clinician questions from medical journals, drug interaction databases, and internal protocols. Chunks include metadata for publication date and evidence level (randomized controlled trial vs. observational study). Specs require "prioritize sources published within 3 years" and "flag recommendations with evidence level below 'high'". This ensures clinicians get current, high-quality guidance.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Customer support RAG: SaaS companies use RAG to answer user questions from product documentation, API references, and troubleshooting guides. Chunks are tagged by product version, and retrieval filters by the user's current version to avoid suggesting features not yet available to them. Specs define fallback behavior: "if no relevant docs found, create a support ticket and respond with ticket ID".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for RAG Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Test chunk sizes with domain content: technical docs need larger chunks (1000+ tokens) than FAQs (300-500 tokens) to preserve procedure context.</li>
            <li>Set similarity thresholds based on validation: measure precision@k on a held-out query set; adjust threshold to maximize relevant retrievals while minimizing false positives.</li>
            <li>Include citation requirements in generation prompts: "every claim must reference a source number" forces the LLM to ground answers in retrieved content.</li>
            <li>Define metadata filtering rules: pre-filter by document type, date, or access level before vector search to improve precision and enforce security.</li>
            <li>Specify fallback behavior: when no relevant documents are found, the system should either expand search, query a different index, or transparently admit insufficient information rather than hallucinate.</li>
            <li>Monitor context window usage: retrieved chunks should not exceed 60-70% of the LLM's context to leave room for the prompt template, query, and instructions.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}