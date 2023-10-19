--
-- PostgreSQL database cluster dump
--

-- Started on 2023-10-17 17:28:46

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-10-17 17:28:46

--
-- PostgreSQL database dump complete
--

--
-- Database "Symbol" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3315 (class 1262 OID 16394)
-- Name: Symbol; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Symbol" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


ALTER DATABASE "Symbol" OWNER TO postgres;

\connect "Symbol"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 210 (class 1259 OID 16410)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16409)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3316 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3164 (class 2604 OID 16413)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3309 (class 0 OID 16410)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
5	Test	U2FsdGVkX18K2ceU58soxFPZbpHGeKBFGAh0eCb4bTo=
\.


--
-- TOC entry 3317 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 3166 (class 2606 OID 16415)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3168 (class 2606 OID 16417)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


-- Completed on 2023-10-17 17:28:47

--
-- PostgreSQL database dump complete
--

--
-- Database "api_halloween" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3370 (class 1262 OID 32893)
-- Name: api_halloween; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE api_halloween WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


ALTER DATABASE api_halloween OWNER TO postgres;

\connect api_halloween

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 831 (class 1247 OID 32895)
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'admin',
    'group'
);


ALTER TYPE public.role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 32945)
-- Name: group_answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_answer (
    group_id integer NOT NULL,
    question_id integer NOT NULL,
    is_correct boolean NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_answer OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32959)
-- Name: group_trial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_trial (
    group_id integer NOT NULL,
    trial_id integer NOT NULL,
    score integer NOT NULL,
    is_done boolean NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_trial OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 32933)
-- Name: proposal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proposal (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    question_id integer
);


ALTER TABLE public.proposal OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 32932)
-- Name: proposal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proposal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposal_id_seq OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 215
-- Name: proposal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proposal_id_seq OWNED BY public.proposal.id;


--
-- TOC entry 214 (class 1259 OID 32923)
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id integer NOT NULL,
    statement text NOT NULL,
    wiki text NOT NULL,
    timestampn timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.question OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 32922)
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 213
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- TOC entry 212 (class 1259 OID 32911)
-- Name: trial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trial (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    rules text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    high_score integer DEFAULT 0,
    max_score integer DEFAULT 0
);


ALTER TABLE public.trial OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 32910)
-- Name: trial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trial_id_seq OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 211
-- Name: trial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trial_id_seq OWNED BY public.trial.id;


--
-- TOC entry 210 (class 1259 OID 32900)
-- Name: users_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_group (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.role DEFAULT 'group'::public.role NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users_group OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 32899)
-- Name: users_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_group_id_seq OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_group_id_seq OWNED BY public.users_group.id;


--
-- TOC entry 3199 (class 2604 OID 32936)
-- Name: proposal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposal ALTER COLUMN id SET DEFAULT nextval('public.proposal_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 32926)
-- Name: question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 32914)
-- Name: trial id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trial ALTER COLUMN id SET DEFAULT nextval('public.trial_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 32903)
-- Name: users_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_group ALTER COLUMN id SET DEFAULT nextval('public.users_group_id_seq'::regclass);


--
-- TOC entry 3363 (class 0 OID 32945)
-- Dependencies: 217
-- Data for Name: group_answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_answer (group_id, question_id, is_correct, "timestamp") FROM stdin;
\.


--
-- TOC entry 3364 (class 0 OID 32959)
-- Dependencies: 218
-- Data for Name: group_trial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_trial (group_id, trial_id, score, is_done, "timestamp") FROM stdin;
\.


--
-- TOC entry 3362 (class 0 OID 32933)
-- Dependencies: 216
-- Data for Name: proposal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proposal (id, title, "timestamp", question_id) FROM stdin;
\.


--
-- TOC entry 3360 (class 0 OID 32923)
-- Dependencies: 214
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, statement, wiki, timestampn) FROM stdin;
\.


--
-- TOC entry 3358 (class 0 OID 32911)
-- Dependencies: 212
-- Data for Name: trial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trial (id, title, description, rules, "timestamp", high_score, max_score) FROM stdin;
\.


--
-- TOC entry 3356 (class 0 OID 32900)
-- Dependencies: 210
-- Data for Name: users_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_group (id, name, password, role, "timestamp") FROM stdin;
\.


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 215
-- Name: proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proposal_id_seq', 1, false);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 213
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 1, false);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 211
-- Name: trial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trial_id_seq', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_group_id_seq', 3, true);


--
-- TOC entry 3210 (class 2606 OID 32939)
-- Name: proposal proposal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposal
    ADD CONSTRAINT proposal_pkey PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 32931)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 32921)
-- Name: trial trial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trial
    ADD CONSTRAINT trial_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 32909)
-- Name: users_group users_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_group
    ADD CONSTRAINT users_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 32954)
-- Name: group_answer group_answer_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_answer
    ADD CONSTRAINT group_answer_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id);


--
-- TOC entry 3212 (class 2606 OID 32949)
-- Name: group_answer group_answer_users_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_answer
    ADD CONSTRAINT group_answer_users_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.users_group(id);


--
-- TOC entry 3214 (class 2606 OID 32963)
-- Name: group_trial group_trial_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_trial
    ADD CONSTRAINT group_trial_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.users_group(id);


--
-- TOC entry 3215 (class 2606 OID 32968)
-- Name: group_trial group_trial_trial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_trial
    ADD CONSTRAINT group_trial_trial_id_fkey FOREIGN KEY (trial_id) REFERENCES public.trial(id);


--
-- TOC entry 3211 (class 2606 OID 32940)
-- Name: proposal proposal_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposal
    ADD CONSTRAINT proposal_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id);


-- Completed on 2023-10-17 17:28:47

--
-- PostgreSQL database dump complete
--

--
-- Database "blog_database" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3344 (class 1262 OID 32795)
-- Name: blog_database; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE blog_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


ALTER DATABASE blog_database OWNER TO postgres;

\connect blog_database

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 827 (class 1247 OID 32827)
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 32859)
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    article_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    img_public_id character varying(255),
    content text,
    img character varying(255),
    date_of_creation timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 32858)
-- Name: articles_article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_article_id_seq OWNER TO postgres;

--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 211
-- Name: articles_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_article_id_seq OWNED BY public.articles.article_id;


--
-- TOC entry 214 (class 1259 OID 32874)
-- Name: commentary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commentary (
    commentary_id integer NOT NULL,
    description text,
    date_of_creation timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer,
    article_id integer
);


ALTER TABLE public.commentary OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 32873)
-- Name: commentary_commentary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commentary_commentary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commentary_commentary_id_seq OWNER TO postgres;

--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 213
-- Name: commentary_commentary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commentary_commentary_id_seq OWNED BY public.commentary.commentary_id;


--
-- TOC entry 210 (class 1259 OID 32832)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 32831)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3179 (class 2604 OID 32862)
-- Name: articles article_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN article_id SET DEFAULT nextval('public.articles_article_id_seq'::regclass);


--
-- TOC entry 3181 (class 2604 OID 32877)
-- Name: commentary commentary_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentary ALTER COLUMN commentary_id SET DEFAULT nextval('public.commentary_commentary_id_seq'::regclass);


--
-- TOC entry 3177 (class 2604 OID 32835)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3336 (class 0 OID 32859)
-- Dependencies: 212
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (article_id, title, description, img_public_id, content, img, date_of_creation, user_id) FROM stdin;
1	Test	abc	\N	abc	\N	2023-10-17 10:17:30.921327+02	1
2	Test	abc	\N	abc	\N	2023-10-17 10:21:02.548498+02	1
3	Test	abc	\N	abc	\N	2023-10-17 10:21:02.553783+02	1
4	Test	abc	\N	abc	\N	2023-10-17 10:21:02.556841+02	1
5	Test	abc	\N	abc	\N	2023-10-17 10:21:02.560362+02	1
6	Test	abc	\N	abc	\N	2023-10-17 10:21:02.56394+02	1
7	Test	abc	\N	abc	\N	2023-10-17 10:21:02.56713+02	1
\.


--
-- TOC entry 3338 (class 0 OID 32874)
-- Dependencies: 214
-- Data for Name: commentary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commentary (commentary_id, description, date_of_creation, user_id, article_id) FROM stdin;
\.


--
-- TOC entry 3334 (class 0 OID 32832)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, email, password, role) FROM stdin;
1	Tim	tim@gmail.com	abc	admin
\.


--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 211
-- Name: articles_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_article_id_seq', 7, true);


--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 213
-- Name: commentary_commentary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commentary_commentary_id_seq', 1, false);


--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 3188 (class 2606 OID 32867)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (article_id);


--
-- TOC entry 3190 (class 2606 OID 32882)
-- Name: commentary commentary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentary
    ADD CONSTRAINT commentary_pkey PRIMARY KEY (commentary_id);


--
-- TOC entry 3184 (class 2606 OID 32842)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3186 (class 2606 OID 32840)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3191 (class 2606 OID 32868)
-- Name: articles articles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3193 (class 2606 OID 32888)
-- Name: commentary commentary_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentary
    ADD CONSTRAINT commentary_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(article_id);


--
-- TOC entry 3192 (class 2606 OID 32883)
-- Name: commentary commentary_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentary
    ADD CONSTRAINT commentary_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2023-10-17 17:28:47

--
-- PostgreSQL database dump complete
--

--
-- Database "covoit_dev" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3468 (class 1262 OID 24586)
-- Name: covoit_dev; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE covoit_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


ALTER DATABASE covoit_dev OWNER TO postgres;

\connect covoit_dev

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 24640)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- TOC entry 889 (class 1247 OID 24739)
-- Name: oban_job_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oban_job_state AS ENUM (
    'available',
    'scheduled',
    'executing',
    'retryable',
    'completed',
    'discarded',
    'cancelled'
);


ALTER TYPE public.oban_job_state OWNER TO postgres;

--
-- TOC entry 255 (class 1255 OID 24770)
-- Name: oban_jobs_notify(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.oban_jobs_notify() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  channel text;
  notice json;
BEGIN
  IF NEW.state = 'available' THEN
    channel = 'public.oban_insert';
    notice = json_build_object('queue', NEW.queue);

    PERFORM pg_notify(channel, notice::text);
  END IF;

  RETURN NULL;
END;
$$;


ALTER FUNCTION public.oban_jobs_notify() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 24603)
-- Name: comptes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comptes (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    nom_enfant character varying(255) NOT NULL,
    prenom_enfant character varying(255) NOT NULL,
    status character varying(255) DEFAULT 'actif'::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    email character varying(255),
    password_hash character varying(255),
    niveau_6 boolean DEFAULT false,
    niveau_5 boolean DEFAULT false,
    niveau_4 boolean DEFAULT false,
    niveau_3 boolean DEFAULT false,
    is_admin boolean DEFAULT false,
    lat double precision,
    lon double precision
);


ALTER TABLE public.comptes OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24602)
-- Name: comptes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comptes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comptes_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 213
-- Name: comptes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comptes_id_seq OWNED BY public.comptes.id;


--
-- TOC entry 212 (class 1259 OID 24593)
-- Name: demandes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.demandes (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    nom_enfant character varying(255) NOT NULL,
    prenom_enfant character varying(255) NOT NULL,
    status character varying(255) DEFAULT 'en_attente'::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    email character varying(255),
    password_hash character varying(255),
    niveau_6 boolean DEFAULT false,
    niveau_5 boolean DEFAULT false,
    niveau_4 boolean DEFAULT false,
    niveau_3 boolean DEFAULT false,
    is_admin boolean DEFAULT false,
    lat double precision,
    lon double precision
);


ALTER TABLE public.demandes OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24592)
-- Name: demandes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.demandes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.demandes_id_seq OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 211
-- Name: demandes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.demandes_id_seq OWNED BY public.demandes.id;


--
-- TOC entry 218 (class 1259 OID 24628)
-- Name: disponibilites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disponibilites (
    id bigint NOT NULL,
    lundi_aller boolean,
    lundi_retour boolean,
    mardi_aller boolean,
    mardi_retour boolean,
    mercredi_aller boolean,
    mercredi_retour boolean,
    jeudi_aller boolean,
    jeudi_retour boolean,
    vendredi_aller boolean,
    vendredi_retour boolean,
    compte_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.disponibilites OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24627)
-- Name: disponibilites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disponibilites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.disponibilites_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 217
-- Name: disponibilites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disponibilites_id_seq OWNED BY public.disponibilites.id;


--
-- TOC entry 216 (class 1259 OID 24613)
-- Name: livres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.livres (
    id bigint NOT NULL,
    auteur character varying(255),
    titre character varying(255),
    edition character varying(255),
    image character varying(255),
    etat character varying(255),
    compte_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.livres OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24612)
-- Name: livres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.livres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.livres_id_seq OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 215
-- Name: livres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.livres_id_seq OWNED BY public.livres.id;


--
-- TOC entry 222 (class 1259 OID 24752)
-- Name: oban_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.oban_jobs (
    id bigint NOT NULL,
    state public.oban_job_state DEFAULT 'available'::public.oban_job_state NOT NULL,
    queue text DEFAULT 'default'::text NOT NULL,
    worker text NOT NULL,
    args jsonb DEFAULT '{}'::jsonb NOT NULL,
    errors jsonb[] DEFAULT ARRAY[]::jsonb[] NOT NULL,
    attempt integer DEFAULT 0 NOT NULL,
    max_attempts integer DEFAULT 20 NOT NULL,
    inserted_at timestamp without time zone DEFAULT timezone('UTC'::text, now()) NOT NULL,
    scheduled_at timestamp without time zone DEFAULT timezone('UTC'::text, now()) NOT NULL,
    attempted_at timestamp without time zone,
    completed_at timestamp without time zone,
    attempted_by text[],
    discarded_at timestamp without time zone,
    priority integer DEFAULT 0 NOT NULL,
    tags character varying(255)[] DEFAULT ARRAY[]::character varying[],
    meta jsonb DEFAULT '{}'::jsonb,
    cancelled_at timestamp without time zone,
    CONSTRAINT attempt_range CHECK (((attempt >= 0) AND (attempt <= max_attempts))),
    CONSTRAINT positive_max_attempts CHECK ((max_attempts > 0)),
    CONSTRAINT priority_range CHECK (((priority >= 0) AND (priority <= 3))),
    CONSTRAINT queue_length CHECK (((char_length(queue) > 0) AND (char_length(queue) < 128))),
    CONSTRAINT worker_length CHECK (((char_length(worker) > 0) AND (char_length(worker) < 128)))
);


ALTER TABLE public.oban_jobs OWNER TO postgres;

--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 222
-- Name: TABLE oban_jobs; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.oban_jobs IS '11';


--
-- TOC entry 221 (class 1259 OID 24751)
-- Name: oban_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oban_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.oban_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 221
-- Name: oban_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.oban_jobs_id_seq OWNED BY public.oban_jobs.id;


--
-- TOC entry 223 (class 1259 OID 24793)
-- Name: oban_peers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE UNLOGGED TABLE public.oban_peers (
    name text NOT NULL,
    node text NOT NULL,
    started_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public.oban_peers OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24587)
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24723)
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    id bigint NOT NULL,
    name character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24722)
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tests_id_seq OWNER TO postgres;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 219
-- Name: tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tests_id_seq OWNED BY public.tests.id;


--
-- TOC entry 3257 (class 2604 OID 24606)
-- Name: comptes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comptes ALTER COLUMN id SET DEFAULT nextval('public.comptes_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 24596)
-- Name: demandes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes ALTER COLUMN id SET DEFAULT nextval('public.demandes_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 24631)
-- Name: disponibilites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilites ALTER COLUMN id SET DEFAULT nextval('public.disponibilites_id_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 24616)
-- Name: livres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.livres ALTER COLUMN id SET DEFAULT nextval('public.livres_id_seq'::regclass);


--
-- TOC entry 3267 (class 2604 OID 24755)
-- Name: oban_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oban_jobs ALTER COLUMN id SET DEFAULT nextval('public.oban_jobs_id_seq'::regclass);


--
-- TOC entry 3266 (class 2604 OID 24726)
-- Name: tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests ALTER COLUMN id SET DEFAULT nextval('public.tests_id_seq'::regclass);


--
-- TOC entry 3453 (class 0 OID 24603)
-- Dependencies: 214
-- Data for Name: comptes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comptes (id, nom, prenom, code_postal, ville, nom_enfant, prenom_enfant, status, inserted_at, updated_at, email, password_hash, niveau_6, niveau_5, niveau_4, niveau_3, is_admin, lat, lon) FROM stdin;
\.


--
-- TOC entry 3451 (class 0 OID 24593)
-- Dependencies: 212
-- Data for Name: demandes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.demandes (id, nom, prenom, code_postal, ville, nom_enfant, prenom_enfant, status, inserted_at, updated_at, email, password_hash, niveau_6, niveau_5, niveau_4, niveau_3, is_admin, lat, lon) FROM stdin;
\.


--
-- TOC entry 3457 (class 0 OID 24628)
-- Dependencies: 218
-- Data for Name: disponibilites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disponibilites (id, lundi_aller, lundi_retour, mardi_aller, mardi_retour, mercredi_aller, mercredi_retour, jeudi_aller, jeudi_retour, vendredi_aller, vendredi_retour, compte_id, inserted_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3455 (class 0 OID 24613)
-- Dependencies: 216
-- Data for Name: livres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.livres (id, auteur, titre, edition, image, etat, compte_id, inserted_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3461 (class 0 OID 24752)
-- Dependencies: 222
-- Data for Name: oban_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.oban_jobs (id, state, queue, worker, args, errors, attempt, max_attempts, inserted_at, scheduled_at, attempted_at, completed_at, attempted_by, discarded_at, priority, tags, meta, cancelled_at) FROM stdin;
\.


--
-- TOC entry 3462 (class 0 OID 24793)
-- Dependencies: 223
-- Data for Name: oban_peers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.oban_peers (name, node, started_at, expires_at) FROM stdin;
\.


--
-- TOC entry 3449 (class 0 OID 24587)
-- Dependencies: 210
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, inserted_at) FROM stdin;
20230123092007	2023-10-02 14:05:30
20230123092209	2023-10-02 14:05:30
20230123104235	2023-10-02 14:05:30
20230123162500	2023-10-02 14:05:30
20230124150336	2023-10-02 14:05:30
20230220132826	2023-10-02 14:05:30
20230326201911	2023-10-02 14:05:30
20230516100048	2023-10-02 14:05:30
20230516101435	2023-10-02 14:05:30
20230706153928	2023-10-02 14:05:30
20230709153018	2023-10-02 14:05:30
20230711084757	2023-10-02 14:05:30
20230725094244	2023-10-02 14:05:30
20230725145006	2023-10-02 14:05:30
20230824160840	2023-10-02 14:05:31
20230927151046	2023-10-02 14:05:31
20230929131313	2023-10-02 14:05:31
20230929134251	2023-10-02 14:05:31
20231002080540	2023-10-02 14:05:31
\.


--
-- TOC entry 3459 (class 0 OID 24723)
-- Dependencies: 220
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (id, name, inserted_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 213
-- Name: comptes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comptes_id_seq', 1, false);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 211
-- Name: demandes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.demandes_id_seq', 1, false);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 217
-- Name: disponibilites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disponibilites_id_seq', 1, false);


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 215
-- Name: livres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.livres_id_seq', 1, false);


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 221
-- Name: oban_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oban_jobs_id_seq', 2, true);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 219
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_id_seq', 1, false);


--
-- TOC entry 3289 (class 2606 OID 24611)
-- Name: comptes comptes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comptes
    ADD CONSTRAINT comptes_pkey PRIMARY KEY (id);


--
-- TOC entry 3287 (class 2606 OID 24601)
-- Name: demandes demandes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT demandes_pkey PRIMARY KEY (id);


--
-- TOC entry 3297 (class 2606 OID 24633)
-- Name: disponibilites disponibilites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilites
    ADD CONSTRAINT disponibilites_pkey PRIMARY KEY (id);


--
-- TOC entry 3294 (class 2606 OID 24620)
-- Name: livres livres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.livres
    ADD CONSTRAINT livres_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 24766)
-- Name: oban_jobs oban_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oban_jobs
    ADD CONSTRAINT oban_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3306 (class 2606 OID 24799)
-- Name: oban_peers oban_peers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oban_peers
    ADD CONSTRAINT oban_peers_pkey PRIMARY KEY (name);


--
-- TOC entry 3285 (class 2606 OID 24591)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 3299 (class 2606 OID 24728)
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 1259 OID 24639)
-- Name: disponibilites_compte_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX disponibilites_compte_id_index ON public.disponibilites USING btree (compte_id);


--
-- TOC entry 3290 (class 1259 OID 24729)
-- Name: livre_auteur_gin_trgm_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX livre_auteur_gin_trgm_idx ON public.livres USING gin (auteur public.gin_trgm_ops);


--
-- TOC entry 3291 (class 1259 OID 24721)
-- Name: livre_titre_gin_trgm_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX livre_titre_gin_trgm_idx ON public.livres USING gin (titre public.gin_trgm_ops);


--
-- TOC entry 3292 (class 1259 OID 24626)
-- Name: livres_compte_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX livres_compte_id_index ON public.livres USING btree (compte_id);


--
-- TOC entry 3300 (class 1259 OID 24791)
-- Name: oban_jobs_args_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX oban_jobs_args_index ON public.oban_jobs USING gin (args);


--
-- TOC entry 3301 (class 1259 OID 24792)
-- Name: oban_jobs_meta_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX oban_jobs_meta_index ON public.oban_jobs USING gin (meta);


--
-- TOC entry 3304 (class 1259 OID 24786)
-- Name: oban_jobs_state_queue_priority_scheduled_at_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX oban_jobs_state_queue_priority_scheduled_at_id_index ON public.oban_jobs USING btree (state, queue, priority, scheduled_at, id);


--
-- TOC entry 3309 (class 2620 OID 24781)
-- Name: oban_jobs oban_notify; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER oban_notify AFTER INSERT ON public.oban_jobs FOR EACH ROW EXECUTE FUNCTION public.oban_jobs_notify();


--
-- TOC entry 3308 (class 2606 OID 24634)
-- Name: disponibilites disponibilites_compte_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilites
    ADD CONSTRAINT disponibilites_compte_id_fkey FOREIGN KEY (compte_id) REFERENCES public.comptes(id);


--
-- TOC entry 3307 (class 2606 OID 24621)
-- Name: livres livres_compte_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.livres
    ADD CONSTRAINT livres_compte_id_fkey FOREIGN KEY (compte_id) REFERENCES public.comptes(id);


-- Completed on 2023-10-17 17:28:48

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-10-17 17:28:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3307 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 822 (class 1247 OID 32790)
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.user_role OWNER TO postgres;

-- Completed on 2023-10-17 17:28:48

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-10-17 17:28:48

--
-- PostgreSQL database cluster dump complete
--

