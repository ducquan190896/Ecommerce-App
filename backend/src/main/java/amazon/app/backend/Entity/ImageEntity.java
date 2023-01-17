package amazon.app.backend.Entity;

import javax.persistence.*;


import lombok.*;


@Table(name = "image_entity")
@Entity(name = "Image_entity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageEntity {
    @Id
    @SequenceGenerator(
        name = "image_entity_sequence",
        sequenceName = "image_entity_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "image_entity_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "filename", nullable = false)
    private String filename;
    @Column(name = "type", nullable = false)
    private String type;
    @Column(name = "databye", nullable = false)
    private byte[] databye;


    public ImageEntity(String filename, String type, byte[] databye) {
        this.filename = filename;
        this.type = type;
        this.databye = databye;
    }


    
}
