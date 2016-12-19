(function () {
	var users = require('./mock');
	
	var adminTemplate = require('./hbs/admin.hbs');

	var userTemplate = require('./hbs/user.hbs');

	var container = document.getElementById('container');
	

	renderMainPage();

	function renderMainPage(){
				
		container.innerHTML = "";
		var form = document.createElement('form');
		form.addEventListener('submit', ONSubmit);

		var ul = document.createElement('ul');

		createElem("login", "login", ul);

		createElem("password", "password", ul);

		createElem("submit", "submit", ul);

		form.appendChild(ul);

		container.appendChild(form);
		
	}	

	function createElem(name, type, parent){
		var li = document.createElement('li');

		var el = document.createElement('input');
		el.setAttribute('type',type);
		el.setAttribute('name',name);
		el.setAttribute('id',name);
		
		
		if (type !== 'submit') {
			el.setAttribute("required", true);
			el.setAttribute("placeholder", "your " + name);
			el.setAttribute('class',"box");
			label = document.createElement('label');
			label.setAttribute('for',name);
			label.innerHTML = name;
			li.appendChild(label);
		}	
		li.appendChild(el);
		parent.appendChild(li);
		
	} 

	function ONSubmit(event){
		event.preventDefault();

		var login = document.getElementById("login").value + '';
		var password = document.getElementById("password").value + '';
		var resalt = chekData(login, password);
		if (resalt.admin){			
			renderAdmin(resalt);
		} else if (resalt.name){
			renderUser(resalt);
		} else {
			container.innerHTML = resalt.message;
		}	

	}

	function chekData(login, password){
		var message = '';
		var user = {};
		for (var i = users.length - 1; i >= 0; i--) {
			if ((users[i].name === login) && (users[i].password === password)){
				message = 'You successfully login!!! Welcome ' + users[i].name;
				user = users[i];
				break;
			} else {
				message = 'Check the login and password!!! You are not logged in!';
			}
		}		
		user.message = message;
		return user;		
	};

	function renderAdmin(userAdmin){		
		container.innerHTML = adminTemplate(userAdmin);

		var adminForm = document.getElementById('adminForm');
		adminForm.classList.add("hiden");
		adminForm.addEventListener('submit', OnAdminSubmit);

		var returnToMain = document.getElementById("returnToMain");
			returnToMain.addEventListener('click', renderMainPage);

			var addNewUser = document.getElementById("addNewUser");
			addNewUser.addEventListener('click', showForm);
		
		function OnAdminSubmit(event){
			event.preventDefault();				

			var adminLogin = document.getElementById("adminLogin").value + '';
			var adminPassword = document.getElementById("adminPassword").value + '';
			var userName = true;
			for (var i =  0; i < users.length; i++) {
				if (adminLogin === users[i].name) {
					alert("This username is already taken, please enter another");
					userName = false;
					break;
				}
			}
			if (userName)	{
				users.push({
					name: adminLogin,
					password: adminPassword,
					admin: false	
				});
			};
			document.getElementById("adminLogin").value = '';
			document.getElementById("adminPassword").value = '';
		}

		function showForm(event){			
	
			var adminForm = document.getElementById('adminForm');

			if (adminForm.classList.contains("hiden")) {
				adminForm.classList.remove("hiden");
				
			} else {
				adminForm.classList.add("hiden");
			}		

		}
	}
	function renderUser(curentUser){
		
		container.innerHTML = userTemplate(curentUser);

		var returnToMain = document.getElementById("returnToMain");
		returnToMain.addEventListener('click', renderMainPage);
	};
	
}());