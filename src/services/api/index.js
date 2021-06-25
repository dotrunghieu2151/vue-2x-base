
import axios from 'axios';
import api from './api.service';

const apiService = api({ http: axios });

export default apiService

