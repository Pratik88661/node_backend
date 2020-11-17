# node_backend
### Setup backend server
 step1: clone project by using command 'git clone https://github.com/Pratik88661/node_backend'
 
 step2: Install dependency by using command "npm i"
 
 step3:run command "npm run start"
 
 ## Sequelize Commands
 [sequelize](https://sequelize.org/master/manual/migrations.html "sequelize")
 
 Generate new model: "npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string"
 
 Migrate DB: "npx sequelize-cli db:migrate"
 
 Create seeder: "npx sequelize-cli seed:generate --name demo-user"
 
 #### User module
 We have created basic user schema. fields are firstName, lastName,Email and etc.We can add can manage role for the user 
 if we need to manage admin,user and super admin flow.We are using sequelize paranoid so we can manage deleted users or we can
 say soft delete. 
 
 User can also able to login by using Google account and we will verfied user accounts from both the side front end and backend.If reqired 
 We can manage provider such as local, facebook and google and user devices as well as. If we want to manage provider and user devices history 
 then we can create another table for the label as "user_devices". We can store user device token and provider tokens. user to user_devices model
 we can manage relationships.
 
 ### Survey module
 For the survey module we are creating two tables suach as survey_questions and user_survey. User can create able to create many survey questions with appropriate
 options/ descriptions. We are managing survey question and 4 options for now but we can manage dynamic survey questions and options based on requirements. 
 When user submit any survey at that time we will insert entry into user_survey table which are including surveyQuestionId and another details.For now we are not
 managing more details but if we want then we can manage based on requirements. 
 
## Flow of the project structure
Please find nodejs default project structure.

NODE-BACKEND

└───index.js          # App entry point

     │   
     └───config             # Environment variables and configuration related stuff

     └───app.js             # App definitions and configuration,set global variables,
	                          Express route controllers for all the endpoints of the app
											 
	   └───database.js        # Database config stuff.Manage database for the local, development and production.
		
	   └───winstone.js        # Log config stuff
		
	   └───config.js          # Set global config.
		
     └───constants          # constant data definitions.
		
           └───common.js    # config default success and error code and messages.
			
	        └───models.js    # config constant model details(Enum data).
		
 └───db                 # Database config stuff, For now we are using MYSQL with sequelize.

     └───migrations    # Setup default table migrations
		 
	   └───models        # Manage Database models stuff
	 
	   └───seeders       # Manage Database seeder data.
		 
     └───helper             # Helper dependency.
		 
    └───auth.js      # Manage User authentications stuff.
			
	  └───jwt.js       # Manage jwt token stuff.
		
	  └───utils.js     # Manage Utils details.
		
	  └───Validator    # Manage Express validator stuff.
		
    └───language     # Manage different language content stuff.

      └───translation. # Manage All the error and success messages globalaly.
	      en.json  
				
└───modules            # Manage App modules.

       └───v1          # Manage API based on version.
			 
	        └───app    # Manage Apis for the Web App, Admin panel.
					
			     └───user module
				          └───user.controller.js # Manage bussiness logic
									
						      └───user.service.js    # Manage Api stuff.
							
						      └───user.route.js      # Manage routes
							
						      └───user.middleware.js # Manage User authentications and other validations.
							
						      └───user.validator.js  # Manage Request body validations.
							
				 └───survey module (same as user module file structure)
						
        └───index.js	# Manage Main routes.		
				
     └───ssh                 # SSH keys 

    └───routes              # Manage route.

    └───.env                #Manage details based on environments. we can create and manage multiple environment files such as ".env-local,.env-production".
