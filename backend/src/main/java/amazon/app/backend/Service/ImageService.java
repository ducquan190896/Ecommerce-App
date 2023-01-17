package amazon.app.backend.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    List<String> uploadImage(List<MultipartFile> files);
    byte[] getImage(String filename);
}
