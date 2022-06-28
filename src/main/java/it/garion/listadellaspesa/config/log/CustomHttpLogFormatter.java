package it.garion.listadellaspesa.config.log;

import org.zalando.logbook.*;

import java.io.IOException;

public class CustomHttpLogFormatter implements HttpLogFormatter {
    @Override
    public String format(Precorrelation precorrelation, HttpRequest request) throws IOException {
        String body = request.getBodyAsString();
        StringBuilder result = new StringBuilder(body.length() + 2048);
        result.append("Request from: ");
        result.append(request.getRemote());
        result.append(' ');
        result.append(request.getMethod());
        result.append(' ');
        result.append(request.getRequestUri());
        result.append(' ');
        result.append(request.getProtocolVersion());
        return result.toString();
    }

    @Override
    public String format(Correlation correlation, HttpResponse response) throws IOException {
        String body = response.getBodyAsString();
        StringBuilder result = new StringBuilder(body.length() + 2048);
        result.append("Response: ");
        result.append(response.getProtocolVersion());
        result.append(' ');
        result.append(response.getStatus());
        String reasonPhrase = response.getReasonPhrase();
        if (reasonPhrase != null) {
            result.append(' ');
            result.append(reasonPhrase);
        }

        return result.toString();
    }
}
