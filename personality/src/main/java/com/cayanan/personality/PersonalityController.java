package com.cayanan.personality;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cayanan/personalities")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonalityController {

    private final PersonalityRepository repository;

    // Autowire the repository in the constructor
    public PersonalityController(PersonalityRepository repository) {
        this.repository = repository;
    }

    // GET endpoint to retrieve all personalities
    @GetMapping
    public List<Personality> getAll() {
        return repository.findAll();
    }

    // POST endpoint to add a single personality
    @PostMapping
    public Personality addSingle(@RequestBody Personality personality) {
        return repository.save(personality);
    }

    // POST endpoint to add multiple personalities in bulk
    @PostMapping("/bulk")
    public List<Personality> addBulk(@RequestBody List<Personality> personalities) {
        return repository.saveAll(personalities);
    }
}
