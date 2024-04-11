const apiKey = "6TB30NHMPOV876FB";
const request = require('request');

class NewsDataService {
    async getNewsDataAddStock(symbol) {
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}AAPL&apikey=${apiKey}`;
        
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
                if (err) {
                    console.error('Error fetching news for symbol:', err);
                    reject(err);
                } else if (res.statusCode !== 200) {
                    console.error('Status:', res.statusCode);
                    reject(new Error('Status code not 200'));
                } else {
                    resolve(data);
                }
            });
        });
    }

    async getNewsData(topFive) {
        const topFiveData = {};

        for (let i = 0; i < topFive.length; i++) {
            const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${topFive[i]}&apikey=${apiKey}`;
            
            try {
                const data = await this.fetchData(url);
                topFiveData[topFive[i]] = data;
            } catch (error) {
                console.error(`Error fetching news for symbol ${topFive[i]}:`, error);
                throw error;
            }
        }

        return topFiveData;
    }

    fetchData(url) {
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode !== 200) {
                    reject(new Error('Status code not 200'));
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export default new NewsDataService();
