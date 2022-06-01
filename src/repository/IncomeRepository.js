import http from 'http';

const API_BASE_URL = 'http://localhost:3000';

class IncomeRepository {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const chunks = [];

      http.get(url, (response) => {
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });

        response.on('error', reject);

        response.on('end', () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });
  }

  async getConversions() {
    const { results } = await this.makeRequest(`${API_BASE_URL}/convert`);
    return results;
  }
}

export default IncomeRepository;
