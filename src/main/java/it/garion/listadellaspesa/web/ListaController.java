package it.garion.listadellaspesa.web;

import it.garion.listadellaspesa.web.bean.ListaEntryBean;
import it.garion.listadellaspesa.web.bean.ListaEntryCreateRequestBean;
import it.garion.listadellaspesa.web.bean.ListaEntryUpdateRequestBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class ListaController {
    @Autowired
    private ListaService service;


    @GetMapping(value = "/lista/{entryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListaEntryBean> getEntry(@PathVariable Long entryId) {
        return Optional.of(entryId)
                .flatMap(service::getEntry)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/lista", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ListaEntryBean>> getAllEntries() {
        return Optional.of(service.getAllEntries())
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @PostMapping(value = "/lista", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListaEntryBean> createEntry(@RequestBody ListaEntryCreateRequestBean listaEntry) {
        return Optional.of(listaEntry)
                .flatMap(service::createEntry)
                .map(response -> new ResponseEntity<>(response, HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @PatchMapping(value = "/lista", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListaEntryBean> updateEntry(@RequestBody ListaEntryUpdateRequestBean listaEntry) {
        return Optional.of(listaEntry)
                .flatMap(service::updateEntry)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @DeleteMapping(value = "/lista/{entryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListaEntryBean> deleteEntry(@PathVariable Long entryId) {
        return service.deleteEntry(entryId)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
