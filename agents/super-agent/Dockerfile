# SuperAgent Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better layer caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8080

# Health check (using Python instead of curl for smaller image)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import sys, urllib.request; \
try: \
    resp = urllib.request.urlopen('http://localhost:8080/health', timeout=5); \
    sys.exit(0 if 200 <= resp.getcode() < 400 else 1); \
except Exception: \
    sys.exit(1)"

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]