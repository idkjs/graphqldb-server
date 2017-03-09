import { GQC } from 'graphql-compose';
import './db';
import './rootQuery';
import './rootMutation';

export default GQC.buildSchema();
