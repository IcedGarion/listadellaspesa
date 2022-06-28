package it.garion.listadellaspesa.web.converter;

import it.garion.listadellaspesa.data.model.ListaEntryEntity;
import it.garion.listadellaspesa.web.bean.ListaEntryBean;
import org.springframework.stereotype.Component;

@Component
public class ListaEntryEntityToBeanConverter {
    public ListaEntryBean convert(ListaEntryEntity listaEntryEntity) {
        return new ListaEntryBean(
                listaEntryEntity.getId(),
                listaEntryEntity.getNome(),
                listaEntryEntity.getDove(),
                listaEntryEntity.getCategoria(),
                listaEntryEntity.getNote(),
                listaEntryEntity.isDisponibile());
    }
}
