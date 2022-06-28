package it.garion.listadellaspesa.config.log;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zalando.logbook.DefaultHttpLogWriter;
import org.zalando.logbook.DefaultSink;
import org.zalando.logbook.Logbook;

@Configuration
public class LogbookConfiguration {

    @Bean
    public Logbook logbook() {
        // return Logbook.create();
        return Logbook.builder()
                .sink(new DefaultSink(
                        new CustomHttpLogFormatter(),
                        new DefaultHttpLogWriter()
                ))
                .build();
    }
}