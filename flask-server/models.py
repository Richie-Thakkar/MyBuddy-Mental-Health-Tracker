from server import mysql
class Table:
    def __init__(self, table_name, *args):
        self.table = table_name
        self.columns = "(%s)" %",".join(args)
        self.columnsList = args
    
            
    def getone(self, search, value):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT Email_ID,Password FROM %s WHERE %s = \"%s\"" %(self.table, search, value))
        if result > 0: 
            data = {}; 
            data = cur.fetchone()
            cur.close(); 
            return data
    
    def insert(self,data):
        keys = ', '.join(data.keys())
        values = ', '.join(['%s'] * len(data))
        query = f"INSERT INTO {self.table} ({keys}) VALUES ({values})"

        try:
            cursor = mysql.connection.cursor()
            cursor.execute(query, tuple(data.values()))
            mysql.connection.commit()
        except Exception as e:
            print(f"Error inserting data: {str(e)}")
            mysql.connection.rollback()
        finally:
            cursor.close()
    
    def getall(self,search,value):
        cur=mysql.connection.cursor()
        result = cur.execute("SELECT * FROM %s WHERE %s = \"%s\"" %(self.table, search, value))
        if result>0:
            data={}
            data=cur.fetchall()
            cur.close()
            return data
        
    def updateOne(self, value, attribute, anchor):
        cur = mysql.connection.cursor()
        query = "UPDATE {} SET {} = %s WHERE EMAIL_ID = %s".format(self.table, attribute)
        result = cur.execute(query, (value, anchor))
        mysql.connection.commit()
        cur.close()
        return result
        
        

    '''def getdetailst(self,value):
        c=mysql.connection.cursor()
        result=c.execute("SELECT teacher.tname, subjects.sname FROM teacher JOIN teaches ON teacher.tid = teaches.tid JOIN subjects ON teaches.sid = subjects.sid WHERE teacher.tid = \"%s\"" ,(value,))
        if result>0:
            data={}
            data=c.fetchall()
            c.close()
            return data
    def getsids(self, value):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT sid FROM %s WHERE tid = \"%s\"" %(self.table,value))
        if result > 0: 
            data = {}; 
            data = cur.fetchall()
            cur.close(); 
            return data
    def findsub(self,value):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT sname FROM subjects WHERE sid = \"%s\"" %(value))
        if result > 0: 
            dt = {}; 
            dt = cur.fetchone()
            cur.close(); 
            return dt'''
        
        
    