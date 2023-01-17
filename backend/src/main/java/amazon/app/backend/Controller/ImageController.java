package amazon.app.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import amazon.app.backend.Service.ImageService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @PostMapping("/uploadImages")
    public ResponseEntity<List<String>> uploadImages(@RequestParam(name = "file") List<MultipartFile> files) {
        return new ResponseEntity<List<String>>(imageService.uploadImage(files), HttpStatus.CREATED);
    }
    @GetMapping("/getImage/{filename}")
    public ResponseEntity<?> getImage(@PathVariable String filename) {
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_PNG).body(imageService.getImage(filename));
    }
}
