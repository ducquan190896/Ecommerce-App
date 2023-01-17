package amazon.app.backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import amazon.app.backend.Entity.ImageEntity;
import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.ImageEntityRepos;
import amazon.app.backend.Utils.ImageUtils;

@Service
public class ImageServiceIml implements ImageService {
    @Autowired
    ImageEntityRepos imageEntityRepos;
    @Autowired
    ImageUtils imageUtils;

    @Override
    public byte[] getImage(String filename) {
       Optional<ImageEntity> entity = imageEntityRepos.findByFilename(filename);
       if(!entity.isPresent()) {
        throw new EntityNotFoundException("the image fileName not found");
       }
       ImageEntity image = entity.get();
       byte[] data = imageUtils.decompressImage(image.getDatabye());
       return data;
    }

    @Override
    public List<String> uploadImage(List<MultipartFile> files) {
        List<String> list = new ArrayList<>();
        files.stream().forEach(file -> {
          try {
            String filename = file.getOriginalFilename();
            byte[] data = imageUtils.compressImage(file.getBytes());
            String type = file.getContentType();
            ImageEntity imageEntity = new ImageEntity(filename, type, data);
            imageEntityRepos.save(imageEntity);
            String url = "/api/images/getImage/" + imageEntity.getFilename();
            list.add( url);

          } catch (Exception ex) {
            throw new BadResultException(ex.getMessage());
          }
        });

        return list;
    }

}
