package it.garion.listadellaspesa;

import it.garion.listadellaspesa.data.model.ListaEntryEntity;
import it.garion.listadellaspesa.data.model.ListaRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ListaRepositoryTests {

    @Autowired
    private ListaRepository listaRepository;

    @Test
    public void whenFindingCustomerById_thenCorrect() {
        listaRepository.save(new ListaEntryEntity( "test", "test", "test", "", false));
        assertThat(listaRepository.findById(1L)).isInstanceOf(Optional.class);
    }

    @Test
    public void whenFindingAllCustomers_thenCorrect() {
        listaRepository.save(new ListaEntryEntity( "test", "test", "test", "", false));
        listaRepository.save(new ListaEntryEntity( "test", "test", "test", "", false));
        assertThat(listaRepository.findAll()).isInstanceOf(List.class);
    }
}