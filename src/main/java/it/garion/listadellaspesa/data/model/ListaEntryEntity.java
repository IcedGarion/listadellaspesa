package it.garion.listadellaspesa.data.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "lista")
public class ListaEntryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String nome;

    private String dove;

    private String categoria;

    private String note;

    private boolean disponibile;

    public ListaEntryEntity(String nome, String dove, String categoria, String note, boolean disponibile) {
        this.nome = nome;
        this.dove = dove;
        this.categoria = categoria;
        this.note = note;
        this.disponibile = disponibile;
    }

    @PersistenceConstructor
    public ListaEntryEntity(Long id, String nome, String dove, String categoria, String note, boolean disponibile) {
        this(nome, dove, categoria, note, disponibile);
        this.id = id;
    }

    public ListaEntryEntity setNome(String nome) {
        this.nome = nome;
        return this;
    }

    public ListaEntryEntity setDove(String dove) {
        this.dove = dove;
        return this;
    }

    public ListaEntryEntity setCategoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public ListaEntryEntity setNote(String note) {
        this.note = note;
        return this;
    }

    public ListaEntryEntity setDisponibile(boolean disponibile) {
        this.disponibile = disponibile;
        return this;
    }
}
