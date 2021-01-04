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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/account")
public class AccountController {
	@Autowired
	private AccountRepository accountRepository;

	@PostMapping(path = "/create")
	public @ResponseBody String createAccount(@RequestBody Account newAccount) {
		
		if(!accountRepository.findByEmail(newAccount.getEmail()).isEmpty()) {
			return "Email already in use";
		}
		accountRepository.save(newAccount);
		return "New account saved.";
	}
	
	@PostMapping(path = "/edit")
	public @ResponseBody String editAccount(@RequestParam String email, @RequestBody Account updatedAccount) {
		
		if(!email.equals(updatedAccount.getEmail())) {
			List<Account> accounts = accountRepository.findByEmail(updatedAccount.getEmail());
			if(!accounts.isEmpty()) {
				return "Email already in use";
			}
		}
		
		Account account = accountRepository.findByEmail(email).get(0);
		account.setFullname(updatedAccount.getFullname());
		account.setEmail(updatedAccount.getEmail());
		
		if(updatedAccount.getPassword() != null) {
			account.setPassword(updatedAccount.getPassword());
		}
		accountRepository.save(account);
		
		return "New account saved.";
	}
	
	@GetMapping(path = "/find")
	public @ResponseBody List<Account> findAccount(@RequestParam String email) {
		
		return accountRepository.findByEmail(email);
	}
	
	@DeleteMapping(path = "/delete")
	public @ResponseBody String deleteAccount(@RequestParam String email) {
		
		List<Account> acc_list = accountRepository.findByEmail(email);
		if(acc_list.isEmpty()) {
			return "Account does not exist";
		}
		accountRepository.delete(acc_list.get(0));
		return "Account deleted";
	}
}