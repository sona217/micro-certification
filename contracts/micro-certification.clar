;; Define constants
(define-constant contract-owner tx-sender) ;; Captures the deployer’s address
(define-constant err-not-owner (err u100)) ;; Error code for unauthorized access

;; Define data variables (based on your code snippet)
(define-data-var next-id uint u1) ;; Tracks the next token ID
(define-non-fungible-token course-certificate uint) ;; NFT definition
(define-map certificate-details
  { token-id: uint }
  { student: principal, course-name: (string-ascii 50), issue-date: uint })

;; Function to issue a certificate (inferred from your code)
(define-public (issue-certificate (student principal) (course-name (string-ascii 50)) (issue-date uint))
  (begin
    ;; Check if the caller is the contract owner
    (asserts! (is-eq tx-sender contract-owner) err-not-owner)
    ;; Get the next token ID
    (let ((token-id (var-get next-id)))
      ;; Mint the NFT
      (try! (nft-mint? course-certificate token-id student))
      ;; Store certificate details
      (map-set certificate-details { token-id: token-id }
        { student: student, course-name: course-name, issue-date: issue-date })
      ;; Increment next-id
      (var-set next-id (+ token-id u1))
      ;; Return success
      (ok token-id))))