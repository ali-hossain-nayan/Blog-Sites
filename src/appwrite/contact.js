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
      // Handle form submission and data storage, similar to the AuthService methods
      // You can use the account object to store the contact form data
      // For example, you can create a collection for contact forms in Appwrite and save the data there

      // Replace the following with your data storage logic
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
      // Initialize the Appwrite database service
      const database = this.client.database;
  
      // Replace 'contactForms' with the name of the collection you create in Appwrite
      const collectionId = 'articles';
  
      // Create a document with the contact form data
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
