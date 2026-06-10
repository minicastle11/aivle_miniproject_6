package com.aivle.backend.service;

import com.aivle.backend.entity.Review;
import com.aivle.backend.exception.ReviewNotFoundException;
import com.aivle.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<Review> getReviews(Long bookId) {
        if (bookId != null) {
            return reviewRepository.findByBookId(bookId);
        }

        return reviewRepository.findAll();
    }

    public Review createReview(Review review) {
        if (review.getLikes() == null) {
            review.setLikes(0);
        }

        LocalDateTime now = LocalDateTime.now();

        if (review.getCreatedAt() == null) {
            review.setCreatedAt(now);
        }

        review.setUpdatedAt(now);

        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review request) {
        Review review = getReview(id);

        if (request.getBookId() != null) {
            review.setBookId(request.getBookId());
        }

        if (request.getNickname() != null) {
            review.setNickname(request.getNickname());
        }

        if (request.getContent() != null) {
            review.setContent(request.getContent());
        }

        if (request.getLikes() != null) {
            review.setLikes(request.getLikes());
        }

        review.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        Review review = getReview(id);
        reviewRepository.delete(review);
    }

    private Review getReview(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(id));
    }
}
