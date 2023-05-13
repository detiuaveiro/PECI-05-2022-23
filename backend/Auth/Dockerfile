FROM rust

WORKDIR /usr/src/app

COPY . .

RUN rustup default nightly
RUN cargo build --release


EXPOSE 8000
CMD ["./target/release/auth"]
