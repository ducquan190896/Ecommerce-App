package amazon.app.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.ImageEntity;

@Repository
public interface ImageEntityRepos extends JpaRepository<ImageEntity, Long> {
    
    Optional<ImageEntity> findByFilename(String filename);
}
