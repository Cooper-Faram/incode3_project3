CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    day INTEGER NOT NULL CHECK (
        day >= 1
        AND day <= 7
    )
);