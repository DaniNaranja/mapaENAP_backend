--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-27 14:39:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16460)
-- Name: cortes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cortes (
    id integer NOT NULL,
    calle text NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    tipo text NOT NULL,
    inicio timestamp without time zone NOT NULL,
    termino timestamp without time zone,
    motivo text NOT NULL
);


ALTER TABLE public.cortes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16459)
-- Name: cortes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cortes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cortes_id_seq OWNER TO postgres;

--
-- TOC entry 4812 (class 0 OID 0)
-- Dependencies: 217
-- Name: cortes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cortes_id_seq OWNED BY public.cortes.id;


--
-- TOC entry 220 (class 1259 OID 16469)
-- Name: permisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permisos (
    id integer NOT NULL,
    tipo text NOT NULL,
    fecha date NOT NULL,
    solicitante text NOT NULL,
    inicio timestamp without time zone NOT NULL,
    termino timestamp without time zone NOT NULL,
    calle text NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    observacion text,
    estado text DEFAULT 'En revision'::text NOT NULL,
    motivo text
);


ALTER TABLE public.permisos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16468)
-- Name: permisos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permisos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permisos_id_seq OWNER TO postgres;

--
-- TOC entry 4813 (class 0 OID 0)
-- Dependencies: 219
-- Name: permisos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_id_seq OWNED BY public.permisos.id;


--
-- TOC entry 222 (class 1259 OID 16479)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    role text DEFAULT 'admin'::text NOT NULL,
    password text NOT NULL,
    username text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16478)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4814 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4651 (class 2604 OID 16463)
-- Name: cortes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cortes ALTER COLUMN id SET DEFAULT nextval('public.cortes_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16472)
-- Name: permisos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos ALTER COLUMN id SET DEFAULT nextval('public.permisos_id_seq'::regclass);


--
-- TOC entry 4654 (class 2604 OID 16482)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4657 (class 2606 OID 16467)
-- Name: cortes cortes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cortes
    ADD CONSTRAINT cortes_pkey PRIMARY KEY (id);


--
-- TOC entry 4659 (class 2606 OID 16477)
-- Name: permisos permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 16486)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


-- Completed on 2025-01-27 14:39:55

--
-- PostgreSQL database dump complete
--

