package server_api;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import server_api.model.Account;
import server_api.repository.AccountRepository;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class AccountRepositoryTest {
	
	@Autowired
    private TestEntityManager testEntityManager;
	
    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    public void setup() {
    	Account a = new Account();
    	a.setFullname("John Smith");
    	a.setEmail("john@email.com");
    	a.setPassword("password");
    	a.setAdmin(false);
    	testEntityManager.persist(a);
    	testEntityManager.flush();
    }
    
    @Test
    public void testFindByEmail() {
        Account a = accountRepository.findByEmail("john@email.com").get(0);
        assertThat(a.getFullname()).isEqualTo("John Smith");
    }
}