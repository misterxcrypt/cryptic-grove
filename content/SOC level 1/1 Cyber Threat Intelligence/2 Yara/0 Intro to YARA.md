# YARA

"_The pattern matching swiss knife for malware researchers (and everyone else)_"

Yara can identify <span style="color:rgb(146, 208, 80)">information based on both binary and textual patterns</span>, such as hexadecimal and strings contained within a file.

Rules are used to label these patterns. These YARA rules are used to determine if the file is malicious or not. 

==Example:==
Malware, just like a "Hello World" application, uses strings to store textual data. Here are a few examples of the data that various malware types store within strings:

![[Pasted image 20240710232534.png]]

## My First YARA Rule

The proprietary language that Yara uses for rules is fairly trivial to pick up, but hard to master. 

Using a Yara rule is simple. Every `yara` command requires two arguments to be valid, these are:  
1. The rule file we create.  (myrule.yar)
2. Name of file, directory, or process ID to use the rule for. (somedirectory)
Ex: yara myrule.yar somedirectory

> [!note] Every rule must have a name and condition. #note 

### STEPS

1. Make a file named "**somefile**" via `touch somefile`  
2. Create a new file and name it "**myfirstrule.yar**" like below:
3. Open the "myfirstrule.yar" using a text editor such as `nano` and input the snippet below and save the file:

```shell-session
rule examplerule {
        condition: true
}
```

The **name** of the rule - `examplerule` 
The **condition** - `condition`. 

![[Pasted image 20240710234710.png]]
i) In the first command, the file "somefile" exists.
ii) In the second command, the file "sometextfile" does not exist.

when the condition met, yara prints the "rule name" & "file name"