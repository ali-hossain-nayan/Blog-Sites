import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

//we create a class Authservice for all the users client and account
export class AuthService {
    client = new Client();//here we can set the  the properties of the object but but we have to
    //think when we need the client.yes u got it  we need the client only when create a object ..and 
    //now think when create object yes constructor call for object.so we dont need the waste of code 
    //for set properties here we just set the properties inside the constructor for client then 
    //precisely code running.
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)//here endpoint a appwrite url pass
            .setProject(conf.appwriteProjectId);//here project id that we create in conf.js mey
        this.account = new Account(this.client);//then after creating client we set the value  of client 
        //inside our account
            
    }
//In  appwrite we suggest to async fuction or promises
    async createAccount({email, password, name}) {//here Account object pass us this three properties
        try {//we use try catch here bcz we know that a method can be failed so as createAccount 
            //in try catch we handle the error if its failed.

            //as async function we have to wait for account create thats why await use.
            //in apwrite doc we see first parameter should be a unique id then others properties
            //syntactic sugar here we create unique id then pass other
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another method actually we just check if useAccount hey then user  ko login 
                //kara dea directly
                return this.login({email, password});
            } else {//and else mey we return the userAccount it could be null
               return  userAccount;
            }
        } catch (error) {
            throw error;//here we just throw error if its occured
        }
    }


    //as we want to login the user then we create here the login method 
    async login({email, password}) {
        try {//as async function we have to wait and here we direcly access the account
            //createEmailSession is the method we get from appwrite login create session 
            return await this.account.createEmailSession(email, password);//here we pass the email
            //and password to login
        } catch (error) {
            throw error;
        }
    }

    //contact us
    


    //here we get the Currentuser account bcz bfore logout we have to check if we are login or logout
    //for example we are in homepage then so check if we are login or not
    async getCurrentUser() {
        try {
            return await this.account.get();//here get the account
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);//its just a error throw msg
            //it can be done this way also.we just show the error msg to user
        }
//here return null bcz if we dont get the account then null return 
        return null;
    }


    //its logout session for the logout we create this logout async function
    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();//its the object of the class and this this object can access 
//all the userr as we export it

export default authService

