package server_api.controller;

import server_api.repository.AccountRepository;
import server_api.model.Account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/account")
public class AccountController {
	@Autowired
	private AccountRepository accountRepository;

	@PostMapping(path = "/create")
	public @ResponseBody String createAccount(@RequestParam String email, @RequestParam String fullname, 
			@RequestParam String password, @RequestParam(defaultValue = "false") String admin) {
		
		if(!accountRepository.findByEmail(email).isEmpty()) {
			return "Email already in use";
		}
		Account a = new Account();
		a.setFullname(fullname);
		a.setEmail(email);
		a.setPassword(password);
		a.setAdmin(Boolean.parseBoolean(admin));
		accountRepository.save(a);
		return "New account saved";
	}

	@GetMapping(path = "/find")
	public @ResponseBody List<Account> findAccount(@RequestParam String username) {
		
		return accountRepository.findByEmail(username);
	}
	
	@DeleteMapping(path = "/delete")
	public @ResponseBody String deleteAccount(@RequestParam String username) {
		
		List<Account> acc_list = accountRepository.findByEmail(username);
		if(acc_list.isEmpty()) {
			return "Account does not exist";
		}
		accountRepository.delete(acc_list.get(0));
		return "Account deleted";
	}
}