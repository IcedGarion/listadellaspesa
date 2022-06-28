package it.garion.listadellaspesa.web.converter;

import it.garion.listadellaspesa.web.bean.ListaEntryBean;
import it.garion.listadellaspesa.web.bean.ListaEntryCreateRequestBean;
import it.garion.listadellaspesa.web.bean.ListaEntryUpdateRequestBean;
import org.springframework.stereotype.Component;

@Component
public class ListaEntryRequestToBeanConverter {
    public ListaEntryBean convert(ListaEntryCreateRequestBean listaEntryRequest) {
        return new ListaEntryBean(
                0L,
                listaEntryRequest.getNome(),
                listaEntryRequest.getDove(),
                listaEntryRequest.getCategoria(),
                listaEntryRequest.getNote(),
                listaEntryRequest.isDisponibile());
    }

    public ListaEntryBean convert(ListaEntryUpdateRequestBean listaEntryRequest) {
        return new ListaEntryBean(
                listaEntryRequest.getId(),
                listaEntryRequest.getNome(),
                listaEntryRequest.getDove(),
                listaEntryRequest.getCategoria(),
                listaEntryRequest.getNote(),
                listaEntryRequest.isDisponibile());
    }
}
