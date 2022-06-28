package it.garion.listadellaspesa.web.bean;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ListaEntryCreateRequestBean {
    private String nome;

    private String dove;

    private String categoria;

    private String note;

    private boolean disponibile = false;
}
