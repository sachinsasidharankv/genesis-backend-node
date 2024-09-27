import axios, { AxiosInstance } from "axios";

export type Query = {
    context: any;
    chain: string;
    query: string;
}

export class AgentService {
    private readonly serviceUrl: string;
    private readonly axiosClient: AxiosInstance;

    constructor() {
        this.serviceUrl = 'https://6ebe-103-138-236-18.ngrok-free.app';
        this.axiosClient = axios.create({
            timeout: 10 * 60 * 1000,  // Timeout after 5 seconds
            baseURL: this.serviceUrl,
            headers: { 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "true" }
        });
    }

    async askAgent(query: Query){
        try {
            console.log('askAgent Query:', JSON.stringify(query));
            const response = await this.axiosClient.post('/ask-copilot', query);
            return response.data;
        } catch (error) {
            console.error('Error calling third-party service:', error);
            throw new Error('Failed to get response from third-party service');
        }
    }

    async askChain(query: Query){
        try {
            console.log('askAgent Chain:', JSON.stringify(query));
            const response = await this.axiosClient.post('/ask-chain', query);
            return response.data;
        } catch (error) {
            console.error('Error calling third-party service:', error);
            throw new Error('Failed to get response from third-party service');
        }
    }
}