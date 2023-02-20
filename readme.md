# instructions
	- the aim is to test the upload profile pic feature
	- test can be ran with the following command: 
		- 'npx playwright test --headed --workers=1' 
		- this will allow to visualize the tests with headed browser (no parallelization for now)
	- enter the credentials of the user that'll run the tests in '/.env' file
	- the initial state of the feature is the following: no profile picture
	- the tests will follow this order (those are just the scenarios. for the details of the test cases see the "wtj_test_plan.txt" file):
		- scenario 1,2,3: Verify the ability to upload profile pics of different sizes (there should not be any pre-existing pic)
		- scenario 4,5,6: Verify the ability to load incorrect file format (with no pre-existing pic)
		- scenario 7,8,9: Verify the ability to modify a profile pic. Again, different sizes (there should be a pre-existing pic)
		- scenario 10,11,12: Verify the ability to load incorrect file format (with pre-existing pic)
		- scenario 12: Verify the ability to delete exisiting pic
	- video of first test run: https://youtu.be/0NTSKCLSJIk
---------------------------------------------------------------------------------------------------------------------------------------
# Notes:
	- there seems to be behaviour difference of the WTJ platform depending on the browser used: 
		- in firefox if you load large pic, you get an error msg, not in other browsers.
		- in firefox, loading a large pic (>1mo), breaks the save changes feature (so no cross browser automation possible there...)
	- other issues (WIP):
		- [issues] with chromium browser: https://stackoverflow.com/questions/57331836/problem-with-filechooser-file-chooser-handling-does-not-work-with-multiple-conn
		- [issue] with parallelization. The test seem to fail if ran with multiple workers (prolly linked to the delays and timeouts...)
---------------------------------------------------------------------------------------------------------------------------------------
# infra instructions:
	- install node.js and npm : 
		- visit this page: https://nodejs.org/en/download/
		- check that everything went well via the following commands: 'npm --version' and 'node --version '
	- install dotenv via 'npm install dotenv' so that you can enter user credentials in the .env file
	- run via 'npx playwright test --headed' to visualize the tests with headed browser (list of other commands in cli file [todo] )
	- run via 'npx playwright test --headed --workers=1' to visualize the tests with headed browser (parallelization disabled)
	- run via 'npx playwright test --debug' to do a step by step debbugging execution
	- run via [todo] (liste of all the commands https://playwright.dev/docs/test-cli)
	- I have disabled the other browsers, you can activate them back by uncommenting  "name: 'firefox'" and "webkit" from playwright.config.js
---------------------------------------------------------------------------------------------------------------------------------------
# todo list (for myself):
	- work on the issues in WIP (tag [issues])
	- all the code improvements with the tag [todo]
	- maybe add screenshots and recording just to see how it works

