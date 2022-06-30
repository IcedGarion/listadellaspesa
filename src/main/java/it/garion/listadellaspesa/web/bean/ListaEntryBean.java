package it.garion.listadellaspesa.web.bean;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ListaEntryBean {
    private long id;

    private String nome;

    private String dove;

    private String categoria;

    private String note;

    private boolean disponibile;
}
