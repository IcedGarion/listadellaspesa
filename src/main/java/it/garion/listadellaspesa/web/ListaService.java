package it.garion.listadellaspesa.web;

import it.garion.listadellaspesa.data.dao.ListaDao;
import it.garion.listadellaspesa.web.bean.ListaEntryBean;
import it.garion.listadellaspesa.web.bean.ListaEntryCreateRequestBean;
import it.garion.listadellaspesa.web.bean.ListaEntryUpdateRequestBean;
import it.garion.listadellaspesa.web.converter.ListaEntryEntityToBeanConverter;
import it.garion.listadellaspesa.web.converter.ListaEntryRequestToBeanConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListaService {
    @Autowired
    private ListaDao dao;
    @Autowired
    private ListaEntryEntityToBeanConverter listaEntryEntityToBeanConverter;
    @Autowired
    private ListaEntryRequestToBeanConverter listaEntryRequestToBeanConverter;

    public List<ListaEntryBean> getAllEntries() {
        return dao.findAll()
                .stream().map(listaEntryEntityToBeanConverter::convert)
                .collect(Collectors.toList());
    }

    public Optional<ListaEntryBean> createEntry(ListaEntryCreateRequestBean listaEntry) {
        return Optional.of(listaEntry)
                .map(listaEntryRequestToBeanConverter::convert)
                .map(dao::save)
                .map(listaEntryEntityToBeanConverter::convert);
    }

    public List<ListaEntryBean> updateAllEntries(List<ListaEntryUpdateRequestBean> existingLista) {
        return existingLista.stream()
                .map(listaEntryRequestToBeanConverter::convert)
                .map(dao::updateEntry)
                .flatMap(Optional::stream)
                .map(listaEntryEntityToBeanConverter::convert)
                .collect(Collectors.toList());
    }

    public Optional<ListaEntryBean> updateEntry(ListaEntryUpdateRequestBean existingListaEntry) {
        return Optional.of(existingListaEntry)
                .map(listaEntryRequestToBeanConverter::convert)
                .flatMap(dao::updateEntry)
                .map(listaEntryEntityToBeanConverter::convert);
    }

    public Optional<ListaEntryBean> deleteEntry(Long listaEntryId) {
        return dao.findById(listaEntryId)
                .map(listaEntry -> { dao.deleteById(listaEntry.getId()); return listaEntry; })
                .map(listaEntryEntityToBeanConverter::convert);
    }

}
