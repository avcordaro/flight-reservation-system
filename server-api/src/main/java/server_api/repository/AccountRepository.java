package server_api.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import server_api.model.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> {

	List<Account> findByEmail(String email);
}