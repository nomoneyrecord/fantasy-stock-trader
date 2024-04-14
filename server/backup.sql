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
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id integer NOT NULL,
    balance double precision NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: stock_holdings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stock_holdings (
    id integer NOT NULL,
    symbol character varying(10) NOT NULL,
    quantity integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: stock_holdings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stock_holdings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stock_holdings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stock_holdings_id_seq OWNED BY public.stock_holdings.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: stock_holdings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_holdings ALTER COLUMN id SET DEFAULT nextval('public.stock_holdings_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: -
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
-- Data for Name: stock_holdings; Type: TABLE DATA; Schema: public; Owner: -
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
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.account_id_seq', 11, true);


--
-- Name: stock_holdings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stock_holdings_id_seq', 13, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: stock_holdings stock_holdings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_pkey PRIMARY KEY (id);


--
-- Name: account account_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: stock_holdings stock_holdings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

