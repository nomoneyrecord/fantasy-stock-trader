--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id integer NOT NULL,
    balance double precision NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_id_seq OWNER TO postgres;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: stock_holdings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_holdings (
    id integer NOT NULL,
    symbol character varying(10) NOT NULL,
    quantity integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.stock_holdings OWNER TO postgres;

--
-- Name: stock_holdings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_holdings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_holdings_id_seq OWNER TO postgres;

--
-- Name: stock_holdings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_holdings_id_seq OWNED BY public.stock_holdings.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(128)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: stock_holdings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_holdings ALTER COLUMN id SET DEFAULT nextval('public.stock_holdings_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, balance, user_id) FROM stdin;
1	100000	5
2	100000	6
4	100000	8
3	91695.65500000001	7
6	100000	10
7	100000	11
8	100000	12
9	100000	13
10	100000	14
11	100000	15
5	88841.9076	9
\.


--
-- Data for Name: stock_holdings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock_holdings (id, symbol, quantity, user_id) FROM stdin;
2	TSLQ	10	7
3	TSLL	10	7
1	TSLA.L	20	7
4	TSLS	10	7
9	TSLA	10	9
11	AAPS.L	8	9
10	AAPL	50	9
13	AAPY	10	9
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password) FROM stdin;
1	testuser@example.com	$2b$12$/dgJ4v0HUoymTosN3mcxheAkpXYNq7YdF3id3ubfZ8ygDLqyvMjMK
2	test@test.com	$2b$12$82hC9rGPVOK4T6UJdRzFsuvmVNKStxiwU8dmFHQ9Nq1lKPPix0HIK
3	tom	$2b$12$75OdTl0VESO1Pj44f0SnNunaEfv3miCPqeOFgssYFFfz8NnQBOcPu
5	bob	$2b$12$BsEK7wMUnxQc5XciXEnGj.ngfrKYgKdjzHj8i9yXRHvhMJNK5jS66
6	example@example.com	$2b$12$JH7fP6lj6ew15yGkSmZrmuCdxcJMbzUcOJg.N7.lkachBzXb5Iu0.
7	ron@ron.com	$2b$12$D8gbvAYLOwiFcaKBmAue1Oul7Yjqh4tl3B2.8kEff8APSPzFNT.Sy
8	jon@jon.com	$2b$12$xWmwvy4DBCWPoqBNR3ft4O9vU1VgwAV.sWW9Axtac5GpLV0tfAeOy
9	bob@bob.com	$2b$12$QcVNnUKC4QQNADuZ2ENJ6.n9EUdGN745AG1KKrL/bRVmhu56LcOB6
10	gary@gary.com	$2b$12$I0e5E3jc5BZ/1X4G22yGJeMsTJGy2PliAxoKfcQL5leh1J4MGLu5e
11	garysr@gary.com	$2b$12$/aWuR.qHY3XDgr8H9TwN6OHEj8MThRAs1QVHZt.9l9SE0m3ZwzxoK
12	new1@new.com	$2b$12$bhy4BMmDM8mQCz6fUp8/uOB0DGtmDz9KAh8Wh6ZswS.Bi0ISGMrKa
13	new@new.com	$2b$12$zNSollnBz4IrC2f6NUF1huP0E941QMspc7AcXyZ6KS758qigULA3W
14	new3@new.com	$2b$12$CvVVhQZ4//Hx1qVvrDJUReTXQQiKxryAV6ppq2WjwoA3L1oFgSOIO
15	new4@new.com	$2b$12$gbrl4U7Dm1ZFj6GjEO/3nOmDVIdMnrtx3LpQ1F9TlPgzuyEDdbC6y
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_id_seq', 11, true);


--
-- Name: stock_holdings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_holdings_id_seq', 13, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 15, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: stock_holdings stock_holdings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: account account_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: stock_holdings stock_holdings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

