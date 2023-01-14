package amazon.app.backend.Entity;


public enum StatusOrder {
    OPEN("OPEN"),
    CLOSE("CLOSE");

    private String name;

    StatusOrder(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
