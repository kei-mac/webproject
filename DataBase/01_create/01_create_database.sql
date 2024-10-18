-- ============================================================================
-- データベース構築
-- ============================================================================

-- kita_fwを作成
CREATE DATABASE kita_fw;
CREATE DATABASE kita_app;

-- ユーザとパスワードを追加
CREATE USER kitaadmin WITH PASSWORD 'keitaro';

-- kitaスキーマ作成
CREATE SCHEMA kita;
GRANT ALL PRIVILEGES ON SCHEMA kita TO kitaadmin;

CREATE SCHEMA kita_app;
GRANT ALL PRIVILEGES ON SCHEMA kita_app TO kitaadmin;

-- データベースアクセス権限付与
GRANT CONNECT ON DATABASE kita_fw TO kitaadmin;
GRANT CONNECT ON DATABASE kita_app TO kitaadmin;
