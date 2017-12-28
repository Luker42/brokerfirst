import axios from 'axios';

let login_helper = {
	isLoggedIn: () => {
	  
	 	return axios.get('http://localhost:8888/login.php', {
		    params: {
		      checkLogin: true,
		      user_id: localStorage.user_id,
		      token: localStorage.token
		    }
		  });
	}
}

export default login_helper;