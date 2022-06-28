package it.garion.listadellaspesa.data.dao;

import it.garion.listadellaspesa.data.model.ListaEntryEntity;
import it.garion.listadellaspesa.data.model.ListaRepository;
import it.garion.listadellaspesa.web.bean.ListaEntryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ListaDao {

    @Autowired
    private ListaRepository repository;

    public List<ListaEntryEntity> findAll() {
        return repository.findAll();
    }

    public ListaEntryEntity save(ListaEntryBean listaEntry) {
        return repository.save(new ListaEntryEntity(listaEntry.getNome(), listaEntry.getDove(), listaEntry.getCategoria(), listaEntry.getNote(), listaEntry.isDisponibile()));
    }

    public Optional<ListaEntryEntity> updateEntry(ListaEntryBean listaEntryBean) {
        return repository.findById(listaEntryBean.getId())
                .map(existingListaEntryEntity -> existingListaEntryEntity.setNome(listaEntryBean.getNome()))
                .map(existingListaEntryEntity -> existingListaEntryEntity.setCategoria(listaEntryBean.getCategoria()))
                .map(existingListaEntryEntity -> existingListaEntryEntity.setDove(listaEntryBean.getDove()))
                .map(existingListaEntryEntity -> existingListaEntryEntity.setNote(listaEntryBean.getNote()))
                .map(existingListaEntryEntity -> existingListaEntryEntity.setCategoria(listaEntryBean.getCategoria()))
                .map(repository::save);
    }

    public Optional<ListaEntryEntity> findById(Long listaEntryId) {
        return repository.findById(listaEntryId);
    }

    public void deleteById(long listaEntryId) {
        repository.deleteById(listaEntryId);
    }
}
