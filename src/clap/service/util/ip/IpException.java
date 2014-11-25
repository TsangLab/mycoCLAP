package clap.service.util.ip;

public class IpException extends Exception {

    public IpException() {
    }

    public IpException(String message) {
        super(message);
    }

    public IpException(Throwable cause) {
        super(cause);
    }

    public IpException(String message, Throwable cause) {
        super(message, cause);
    }

}
