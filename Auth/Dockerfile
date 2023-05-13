FROM rust

WORKDIR /usr/src/app

COPY ./auth/ ./

RUN rustup default nightly
RUN cargo build --release


EXPOSE 8000
CMD ["./target/release/auth"]
