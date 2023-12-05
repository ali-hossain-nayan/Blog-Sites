import conf from '../conf/conf.js';
import { Client, ID, Account } from 'appwrite';

export class ContactService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async submitContact({ name, email, message }) {
    try {
      
      const result = await this.saveContactData(name, email, message);

      if (result) {
        return true; // Submission successful
      } else {
        return false; // Submission failed
      }
    } catch (error) {
      throw error;
    }
  }

  async saveContactData(name, email, message) {
    try {
      const database = this.client.database;
  
      const collectionId = 'articles';
  
      const document = await database.createDocument(collectionId, {
        name,
        email,
        message,
        timestamp: Date.now(), // Optionally, include a timestamp
      });
  
      // Handle the response and return true if the data was saved successfully
      if (document.$id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  
}
