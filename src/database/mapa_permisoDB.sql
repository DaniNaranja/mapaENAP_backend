--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-13 08:56:14

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
-- TOC entry 4829 (class 0 OID 0)
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
    termino timestamp without time zone,
    calle text NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    observacion text,
    estado text DEFAULT 'En revision'::text NOT NULL,
    motivo text,
    email text NOT NULL
);


ALTER TABLE public.permisos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16491)
-- Name: permisos_grifos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permisos_grifos (
    id integer NOT NULL,
    tipo text NOT NULL,
    fecha date NOT NULL,
    solicitante text NOT NULL,
    numero_grifo text NOT NULL,
    inicio timestamp without time zone NOT NULL,
    termino timestamp without time zone,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    motivo text NOT NULL,
    email text NOT NULL,
    estado text DEFAULT 'En revision'::text NOT NULL
);


ALTER TABLE public.permisos_grifos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16490)
-- Name: permisos_grifos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permisos_grifos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permisos_grifos_id_seq OWNER TO postgres;

--
-- TOC entry 4830 (class 0 OID 0)
-- Dependencies: 223
-- Name: permisos_grifos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_grifos_id_seq OWNED BY public.permisos_grifos.id;


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
-- TOC entry 4831 (class 0 OID 0)
-- Dependencies: 219
-- Name: permisos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_id_seq OWNED BY public.permisos.id;


--
-- TOC entry 226 (class 1259 OID 16502)
-- Name: usos_grifos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usos_grifos (
    id integer NOT NULL,
    numero_grifo text NOT NULL,
    tipo text NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    inicio timestamp without time zone NOT NULL,
    termino timestamp without time zone,
    motivo text NOT NULL
);


ALTER TABLE public.usos_grifos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16501)
-- Name: usosGrifos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."usosGrifos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."usosGrifos_id_seq" OWNER TO postgres;

--
-- TOC entry 4832 (class 0 OID 0)
-- Dependencies: 225
-- Name: usosGrifos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."usosGrifos_id_seq" OWNED BY public.usos_grifos.id;


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
-- TOC entry 4833 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4661 (class 2604 OID 16463)
-- Name: cortes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cortes ALTER COLUMN id SET DEFAULT nextval('public.cortes_id_seq'::regclass);


--
-- TOC entry 4662 (class 2604 OID 16472)
-- Name: permisos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos ALTER COLUMN id SET DEFAULT nextval('public.permisos_id_seq'::regclass);


--
-- TOC entry 4666 (class 2604 OID 16494)
-- Name: permisos_grifos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos_grifos ALTER COLUMN id SET DEFAULT nextval('public.permisos_grifos_id_seq'::regclass);


--
-- TOC entry 4668 (class 2604 OID 16505)
-- Name: usos_grifos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usos_grifos ALTER COLUMN id SET DEFAULT nextval('public."usosGrifos_id_seq"'::regclass);


--
-- TOC entry 4664 (class 2604 OID 16482)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4670 (class 2606 OID 16467)
-- Name: cortes cortes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cortes
    ADD CONSTRAINT cortes_pkey PRIMARY KEY (id);


--
-- TOC entry 4676 (class 2606 OID 16498)
-- Name: permisos_grifos permisos_grifos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos_grifos
    ADD CONSTRAINT permisos_grifos_pkey PRIMARY KEY (id);


--
-- TOC entry 4672 (class 2606 OID 16477)
-- Name: permisos permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 16509)
-- Name: usos_grifos usosGrifos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usos_grifos
    ADD CONSTRAINT "usosGrifos_pkey" PRIMARY KEY (id);


--
-- TOC entry 4674 (class 2606 OID 16486)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


-- Completed on 2025-02-13 08:56:15

--
-- PostgreSQL database dump complete
--

