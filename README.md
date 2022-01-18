# Discord.js bot template

This is mostly for my purposes, but it's fairly straightforward to build on.

Create new categories in /commands/categories.js

![image](https://user-images.githubusercontent.com/60945964/149975793-58020901-f027-4dd5-8709-3dac8512a4e4.png)

![image](https://user-images.githubusercontent.com/60945964/149976120-4eb1eab3-4bd5-426b-b423-7aeadd0aac79.png)

To write commands, create a folder in /commands/, and create a new file

![image](https://user-images.githubusercontent.com/60945964/149976386-7a9f4dac-3fbc-43b1-b905-37520770d316.png)

In the command file, there are five objects you should include- 

String `name`<br>
String `desc`<br>
Array `aliases`<br>
Array `categories`<br>
Function `execute`<br>

These are mostly self-explanatory, just include the spot in the categories.js array where the category you want to include the command in is. (`example` is in place 0 of the array, so put `[0]` and it will appear there in the help command.) 

Also, `execute` takes 4 arguments, `client`, `message`, `args`, and `prefix` , and the function is what the command will execute.
Again, pretty self explanatory, if you want to add more, make sure that you also change the handler in index.js

![image](https://user-images.githubusercontent.com/60945964/149977577-40213e7a-61f6-4566-a5ef-a1f87aa942dd.png)

